export default function merge<T>(obj1: T, obj2): T {
  Object.keys(obj2)
    .filter((key) => key in obj1)
    .forEach((key) => (obj1[key] = obj2[key]));
  return obj1;
}
