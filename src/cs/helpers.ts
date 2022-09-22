import {
  AnyType,
  Kind,
  List,
  Map,
  Named,
  Optional,
} from "@apexlang/core/model";
import { translations } from "./constant";

export const expandType = (type: AnyType): string => {
  switch (type.kind) {
    case Kind.Primitive:
    case Kind.Alias:
    case Kind.Enum:
    case Kind.Type:
    case Kind.Union:
      const namedValue = (type as Named).name;
      return translations.get(namedValue) ?? namedValue;
    case Kind.Map:
      return `Dictionary<${expandType((type as Map).keyType)}, ${expandType(
        (type as Map).valueType
      )}>`;
    case Kind.List:
      return `List<${expandType((type as List).type)}>`;
    case Kind.Optional:
      return `${expandType((type as Optional).type)}?`;
    default:
      return "unknown";
  }
};