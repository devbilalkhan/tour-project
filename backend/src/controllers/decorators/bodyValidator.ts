import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";

//factory decorator
// we dont know how many keys will the body have
export function bodyValidator(keys: any) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.VALIDATOR, keys, target, key);
  };
}
