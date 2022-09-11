import { Context, Writer } from "@apexlang/core/model";
import { ContextWriter } from "./visitors/base.js";
import { StructVisitor } from "./visitors/struct_visitor.js";
import {
  genOperation,
  InterfaceVisitor,
} from "./visitors/interface_visitor.js";
import { EnumVisitor } from "./visitors/enum_visitor.js";
import { UnionVisitor } from "./visitors/union_visitor.js";
import { rustifyCaps } from "./utils/index.js";
import { apexToRustType } from "./utils/types.js";
import { visibility } from "./utils/config.js";

export class RustBasic extends ContextWriter {
  constructor(writer: Writer) {
    super(writer);
  }

  visitType(context: Context): void {
    this.append(new StructVisitor(context).toString());
  }

  visitInterface(context: Context): void {
    this.append(new InterfaceVisitor(context).toString());
  }

  visitEnum(context: Context): void {
    this.append(new EnumVisitor(context).toString());
  }

  visitUnion(context: Context): void {
    this.append(new UnionVisitor(context).toString());
  }

  visitFunction(context: Context): void {
    const vis = visibility(context.operation.name, context.config);
    this.append(genOperation(context.operation, vis));
  }

  visitAlias(context: Context): void {
    const { alias } = context;
    this.append(
      `pub type ${rustifyCaps(alias.name)} = ${rustifyCaps(
        apexToRustType(alias.type)
      )};\n`
    );
  }
}