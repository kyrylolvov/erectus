import '../../@types/utils';
import { Column, ForeignKey, Index, PgSchema } from './serializer/pgSchema';
import { indexName } from './serializer/pgSerializer';

const pgImportsList = new Set([
  "pgTable",
  "pgEnum",
  "smallint",
  "integer",
  "bigint",
  "boolean",
  "text",
  "varchar",
  "serial",
  "bigserial",
  "decimal",
  "numeric",
  "real",
  "json",
  "jsonb",
  "time",
  "timestamp",
  "date",
  "interval",
  "doublePrecision",
]);

const importsPatch: { [key: string]: string } = {
  'double precision': 'doublePrecision',
  'timestamp without time zone': 'timestamp',
};

const relations = new Set<string>();

const createTableColumns = (
  columns: Column[],
  fks: ForeignKey[],
  enumTypes: Set<string>
): string => {
  let statement = "";

  // no self refs and no cyclic
  const oneColumnsFKs = Object.values(fks)
    .filter((it) => {
      return !isSelf(it);
    })
    .filter((it) => it.columnsFrom.length === 1);

  const fkByColumnName = oneColumnsFKs.reduce((res, it) => {
    const arr = res[it.columnsFrom[0]] || [];
    arr.push(it);
    res[it.columnsFrom[0]] = arr;
    return res;
  }, {} as Record<string, ForeignKey[]>);

  columns.forEach((it) => {
    statement += "\t";
    statement += column(it.type, it.name, enumTypes, it.default);
    statement += it.primaryKey ? ".primaryKey()" : "";
    statement += it.notNull ? ".notNull()" : "";

    const fks = fkByColumnName[it.name];
    if (fks) {
      const fksStatement = fks
        .map((it) => {
          const onDelete =
            it.onDelete && it.onDelete !== "no action" ? it.onDelete : null;
          const onUpdate =
            it.onUpdate && it.onUpdate !== "no action" ? it.onUpdate : null;
          const params = { onDelete, onUpdate };

          const typeSuffix = isCyclic(it) ? ": AnyPgColumn" : "";

          const paramsStr = objToStatement2(params);
          if (paramsStr) {
            return `.references(()${typeSuffix} => ${it.tableTo.camelCase()}.${it.columnsTo[0].camelCase()}, ${paramsStr} )`;
          }
          return `.references(()${typeSuffix} => ${it.tableTo.camelCase()}.${it.columnsTo[0].camelCase()})`;
        })
        .join("");
      statement += fksStatement;
    }

    statement += ",\n";
  });

  return statement;
};

const createTableIndexes = (tableName: string, idxs: Index[]): string => {
  let statement = "";

  idxs.forEach((it) => {
    let idxKey = it.name.startsWith(tableName)
      ? it.name.slice(tableName.length + 1)
      : it.name;
    idxKey = idxKey.endsWith("_index")
      ? idxKey.slice(0, -"_index".length) + "_idx"
      : idxKey;

    idxKey = idxKey.camelCase();

    const indexGeneratedName = indexName(tableName, it.columns);
    const escapedIndexName =
      indexGeneratedName === it.name ? "" : `"${it.name}"`;

    statement += `\t\t${idxKey}: `;
    statement += it.isUnique ? "uniqueIndex(" : "index(";
    statement += `${escapedIndexName})`;
    statement += `.on(${it.columns
      .map((it) => `table.${it.camelCase()}`)
      .join(", ")}),`;
    statement += `\n`;
  });

  return statement;
};

const createTableFKs = (fks: ForeignKey[]): string => {
  let statement = "";

  fks.forEach((it) => {
    const isSelf = it.tableTo === it.tableFrom;
    const tableTo = isSelf ? "table" : `${it.tableTo.camelCase()}`;
    statement += `\t\t${it.name.camelCase()}: foreignKey({\n`;
    statement += `\t\t\tcolumns: [${it.columnsFrom
      .map((i) => `table.${i.camelCase()}`)
      .join(", ")}],\n`;
    statement += `\t\t\tforeignColumns: [${it.columnsTo
      .map((i) => `${tableTo}.${i.camelCase()}`)
      .join(", ")}]\n`;
    statement += `\t\t})`;

    statement +=
      it.onUpdate && it.onUpdate !== "no action"
        ? `.onUpdate("${it.onUpdate}")`
        : "";

    statement +=
      it.onDelete && it.onDelete !== "no action"
        ? `.onDelete("${it.onDelete}")`
        : "";

    statement += `,\n`;
  });

  return statement;
};

const objToStatement = (json: any) => {
  json = Object.fromEntries(Object.entries(json).filter((it) => it[1]));

  const keys = Object.keys(json);
  if (keys.length === 0) return;

  let statement = "{ ";
  statement += keys.map((it) => `"${it}": "${json[it]}"`).join(", ");
  statement += " }";
  return statement;
};

const objToStatement2 = (json: any) => {
  json = Object.fromEntries(Object.entries(json).filter((it) => it[1]));

  const keys = Object.keys(json);
  if (keys.length === 0) return;

  let statement = "{ ";
  statement += keys.map((it) => `${it}: "${json[it]}"`).join(", "); // no "" for keys
  statement += " }";
  return statement;
};

const timeConfig = (json: any) => {
  json = Object.fromEntries(Object.entries(json).filter((it) => it[1]));

  const keys = Object.keys(json);
  if (keys.length === 0) return;

  let statement = "{ ";
  statement += keys.map((it) => `${it}: ${json[it]}`).join(", ");
  statement += " }";
  return statement;
};

const isCyclic = (fk: ForeignKey) => {
  const key = `${fk.tableFrom}-${fk.tableTo}`;
  const reverse = `${fk.tableTo}-${fk.tableFrom}`;
  return relations.has(key) && relations.has(reverse);
};

const isSelf = (fk: ForeignKey) => {
  return fk.tableFrom === fk.tableTo;
};

const column = (
  type: string,
  name: string,
  enumTypes: Set<string>,
  defaultValue?: any
) => {
  const lowered = type.toLowerCase();
  if (lowered === "serial") {
    return `${name.camelCase()}: serial("${name}")`;
  }

  if (lowered === "bigserial") {
    return `${name.camelCase()}: bigserial("${name}", { mode: "bigint" })`;
  }

  if (lowered === "integer") {
    let out = `${name.camelCase()}: integer("${name}")`;
    out += defaultValue ? `.default(${defaultValue})` : "";
    return out;
  }

  if (lowered === "smallint") {
    let out = `${name.camelCase()}: smallint("${name}")`;
    out += defaultValue ? `.default(${defaultValue})` : "";
    return out;
  }

  if (lowered === "bigint") {
    let out = `${name.camelCase()}: bigint("${name}", { mode: "bigint" })`;
    out += defaultValue ? `.default(BigInt(${defaultValue}))` : "";
    return out;
  }

  if (lowered === "boolean") {
    let out = `${name.camelCase()}: boolean("${name}")`;
    out += defaultValue ? `.default(${defaultValue})` : "";
    return out;
  }

  if (lowered === "double precision") {
    let out = `${name.camelCase()}: doublePrecision("${name}")`;
    out += defaultValue ? `.default(${defaultValue})` : "";
    return out;
  }

  if (lowered === "real") {
    let out = `${name.camelCase()}: real("${name}")`;
    out += defaultValue ? `.default(${defaultValue})` : "";
    return out;
  }

  if (lowered.startsWith("numeric")) {
    let params:
      | { precision: string | undefined; scale: string | undefined }
      | undefined;

    if (lowered.length > 7) {
      const [precision, scale] = lowered
        .slice(8, lowered.length - 1)
        .split(",");
      params = { precision, scale };
    }

    const out = params
      ? `${name.camelCase()}: numeric("${name}", ${timeConfig(params)})`
      : `${name.camelCase()}: numeric("${name}")`;

    return out;
  }

  if (lowered.startsWith("timestamp")) {
    const withTimezone = lowered.includes("with time zone");
    const split = lowered.split(" ");
    let precision = split.length >= 2 ? Number(split[1].substring(1, 2)) : null;
    precision = precision ? precision : null;

    const params = timeConfig({ precision, withTimezone });

    let out = params
      ? `${name.camelCase()}: timestamp("${name}", ${params})`
      : `${name.camelCase()}: timestamp("${name}")`;

    defaultValue = defaultValue?.endsWith("::timestamp without time zone")
      ? defaultValue.substring(0, defaultValue.length - 29)
      : defaultValue;

    defaultValue = defaultValue?.endsWith("::timestamp with time zone")
      ? defaultValue.substring(0, defaultValue.length - 26)
      : defaultValue;

    defaultValue =
      defaultValue === "now()" || defaultValue === "CURRENT_TIMESTAMP"
        ? ".defaultNow()"
        : defaultValue
        ? `.default(${defaultValue})`
        : "";

    out += defaultValue;
    return out;
  }

  if (lowered.startsWith("time")) {
    const withTimezone = lowered.includes("with time zone");
    const split = lowered.split(" ");
    let precision = split.length >= 2 ? Number(split[1].substring(1, 2)) : null;
    precision = precision ? precision : null;

    const params = timeConfig({ precision, withTimezone });

    let out = params
      ? `${name.camelCase()}: time("${name}", ${params})`
      : `${name.camelCase()}: time("${name}")`;

    defaultValue =
      defaultValue === "now()"
        ? ".defaultNow()"
        : defaultValue
        ? `.default(${defaultValue})`
        : "";

    out += defaultValue;
    return out;
  }

  if (lowered.startsWith("interval")) {
    const withTimezone = lowered.includes("with time zone");
    const split = lowered.split(" ");
    let precision = split.length >= 2 ? Number(split[1].substring(1, 2)) : null;
    precision = precision ? precision : null;

    const params = timeConfig({ precision, withTimezone });

    let out = params
      ? `${name.camelCase()}: interval(${name}, ${params})`
      : `${name.camelCase()}: interval("${name}")`;

    out += defaultValue ? `.default(${defaultValue})` : "";
    return out;
  }
  if (lowered === "date") {
    let out = `${name}: date("${name}")`;

    defaultValue =
      defaultValue === "now()"
        ? ".defaultNow()"
        : defaultValue
        ? `.default(${defaultValue})`
        : "";

    out += defaultValue;
    return out;
  }

  if (lowered === "text") {
    let out = `${name.camelCase()}: text("${name}")`;
    out += defaultValue ? `.default(${defaultValue})` : "";
    return out;
  }

  if (lowered === "json") {
    let out = `${name.camelCase()}: json("${name}")`;

    defaultValue = defaultValue?.endsWith("::json")
      ? defaultValue.substring(1, defaultValue.length - 7)
      : defaultValue;

    const def = defaultValue ? objToStatement(JSON.parse(defaultValue)) : null;

    out += defaultValue ? `.default(${def})` : "";
    return out;
  }

  if (lowered === "jsonb") {
    let out = `${name.camelCase()}: jsonb("${name}")`;

    defaultValue = defaultValue?.endsWith("::jsonb")
      ? defaultValue.substring(1, defaultValue.length - 8)
      : defaultValue;
    const def = defaultValue ? objToStatement(JSON.parse(defaultValue)) : null;

    out += defaultValue ? `.default(${def})` : "";
    return out;
  }

  if (lowered.startsWith("varchar")) {
    const split = lowered.split(" ");

    let out: string;
    if (split[1]) {
      out = `${name.camelCase()}: varchar("${name}", { size: ${split[1]} })`;
    } else {
      out = `${name.camelCase()}: varchar("${name}")`;
    }

    defaultValue = defaultValue?.endsWith("::character varying")
      ? defaultValue.substring(0, defaultValue.length - 19)
      : defaultValue;

    out += defaultValue ? `.default(${defaultValue})` : "";
    return out;
  }

  if (enumTypes.has(type)) {
    return `${name.camelCase()}: ${type.camelCase()}("${name}")`;
  }

  console.log("uknown", type);
};

export const schemaToTypeScript = (schema: PgSchema) => {
  // collectFKs
  Object.values(schema.tables).forEach((table) => {
    Object.values(table.foreignKeys).forEach((fk) => {
      const relation = `${fk.tableFrom}-${fk.tableTo}`;
      relations.add(relation);
    });
  });

  const schemas = Object.fromEntries(
    Object.entries(schema.schemas).map((it) => {
      return [it[0], it[1].camelCase()];
    })
  );

  const enumTypes = new Set(Object.values(schema.enums).map((it) => it.name));

  const imports = Object.values(schema.tables).reduce(
    (res, it) => {
      const idxImports = Object.values(it.indexes).map((idx) =>
        idx.isUnique ? "uniqueIndex" : "index"
      );
      const fkImpots = Object.values(it.foreignKeys).map((it) => "foreignKey");

      res.pg.push(...idxImports);
      res.pg.push(...fkImpots);

      const columnImports = Object.values(it.columns)
        .map((col) => {
          let patched = importsPatch[col.type] ?? col.type;
          patched = patched.startsWith("varchar(") ? "varchar" : patched;
          patched = patched.startsWith("numeric(") ? "numeric" : patched;
          return patched;
        })
        .filter((type) => {
          return pgImportsList.has(type);
        });

      res.pg.push(...columnImports);
      return res;
    },
    { pg: [] as string[] }
  );

  const enumStatements = Object.values(schema.enums)
    .map((it) => {
      const values = Object.values(it.values)
        .map((it) => `'${it}'`)
        .join(", ");
      return `export const ${it.name.camelCase()} = pgEnum("${
        it.name
      }", [${values}])\n`;
    })
    .join("")
    .concat("\n");

  const schemaStatements = Object.entries(schemas)
    .filter((it) => it[0] !== "public")
    .map((it) => {
      return `export const ${it[1]} = pgSchema("${it[0]}");\n`;
    })
    .join();

  const tableStatements = Object.values(schema.tables).map((table) => {
    const schema = schemas[table.schema];
    const func = schema || schema === "public" ? "pgTable" : schema;
    let statement = `export const ${table.name.camelCase()} = ${func}("${
      table.name
    }", {\n`;
    statement += createTableColumns(
      Object.values(table.columns),
      Object.values(table.foreignKeys),
      enumTypes
    );
    statement += "}";

    // more than 2 fields or self reference or cyclic
    const filteredFKs = Object.values(table.foreignKeys).filter((it) => {
      return it.columnsFrom.length > 1 || isSelf(it);
    });

    if (Object.keys(table.indexes).length > 0 || filteredFKs.length > 0) {
      statement += ",\n";
      statement += "(table) => {\n";
      statement += "\treturn {\n";
      statement += createTableIndexes(table.name, Object.values(table.indexes));
      statement += createTableFKs(Object.values(filteredFKs));
      statement += "\t}\n";
      statement += "}";
    }

    statement += ");";
    return statement;
  });

  const uniquePgImports = ['pgTable', 'pgEnum', 'pgSchema', 'AnyPgColumn', ...new Set(imports.pg)];

  let result = `import { ${uniquePgImports.join(
    ", "
  )} } from "drizzle-orm/pg-core"\n\n`;
  result += enumStatements;
  result += schemaStatements;
  result += '\n';
  result += tableStatements.join('\n\n');

  return result;
};
