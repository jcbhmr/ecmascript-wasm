function ValueLift(v: Value): any {
  switch (v.tag) {
    case 'undefined': return undefined;
    case 'null': return null;
    case 'boolean': return v.val;
    case 'number': return v.val;
    case 'string': return v.val;
    case 'object': return v.val._lift();
    case 'symbol': return v.val._lift();
    case 'bigint': return v.val._lift();
    default: throw new Error(`unreachable: invalid tag ${(v as any).tag}`);
  }
}
function ValueLower(v: any): Value {
  if (typeof v === "function" || (typeof v === "object" && v != null)) {
    return { tag: 'object', val: Object._lower(v) };
  } else if (v === null) {
    return { tag: 'null', val: 'null' };
  } else {
    switch (typeof v) {
      case 'undefined': return { tag: 'undefined', val: 'undefined' };
      case 'boolean': return { tag: 'boolean', val: v };
      case 'number': return { tag: 'number', val: v };
      case 'string': return { tag: 'string', val: v };
      case 'symbol': return { tag: 'symbol', val: Symbol._lower(v) };
      case 'bigint': return { tag: 'bigint', val: Bigint._lower(v) };
      default: throw new Error(`unreachable: invalid typeof ${typeof v}`);
    }
  }
}


export function valueToNumber(self: Value): number {
  return +ValueLift(self);
}
export function valueToString(self: Value): string {
  return `${ValueLift(self)}`;
}
export function valueToBoolean(self: Value): boolean {
  return !!ValueLift(self);
}
export function valueToObject(self: Value): Object {
  return globalThis.Object(ValueLift(self));
}
export function valueInstanceOf(self: Value, c: Object): boolean {
  return ValueLift(self) instanceof (c._lift() as any);
}
export function valueLooselyEquals(self: Value, o: Value): boolean {
  return ValueLift(self) == ValueLift(o);
}
export function valueStrictlyEquals(self: Value, o: Value): boolean {
  return ValueLift(self) === ValueLift(o);
}
export { _import as import };
function _import(s: string, o: Value | undefined): Object {
  if (o == null) {
    return Object._lower(import(s));
  } else {
    return Object._lower(import(s, ValueLift(o)));
  }
}
export function getImportMeta(): Object | undefined {
  return Object._lower(import.meta);
}
export function getGlobalObject(): Object {
  return Object._lower(globalThis);
}
export type Undefined = 'undefined';
export type Null = 'null';
export type PropertyKey = PropertyKeyString | PropertyKeySymbol;
export interface PropertyKeyString {
  tag: 'string',
  val: string,
}
export interface PropertyKeySymbol {
  tag: 'symbol',
  val: Symbol,
}
export type Value = ValueUndefined | ValueNull | ValueBoolean | ValueNumber | ValueString | ValueObject | ValueSymbol | ValueBigint;
export interface ValueUndefined {
  tag: 'undefined',
  val: Undefined,
}
export interface ValueNull {
  tag: 'null',
  val: Null,
}
export interface ValueBoolean {
  tag: 'boolean',
  val: boolean,
}
export interface ValueNumber {
  tag: 'number',
  val: number,
}
export interface ValueString {
  tag: 'string',
  val: string,
}
export interface ValueObject {
  tag: 'object',
  val: Object,
}
export interface ValueSymbol {
  tag: 'symbol',
  val: Symbol,
}
export interface ValueBigint {
  tag: 'bigint',
  val: Bigint,
}

export class Bigint {
  private _value!: bigint;
  static _lower(v: bigint): Bigint {
    const o = new Bigint();
    o._value = v;
    return o;
  }
  private constructor() {}
  clone(): Bigint {
    return Bigint._lower(this._lift());
  }
  _lift(): bigint {
    return this._value;
  }
}

export class Callable {
  private _value!: Function;
  static _lower(v: Function): Callable {
    const o = new Callable();
    o._value = v;
    return o;
  }
  private constructor() {}
  clone(): Callable {
    return Callable._lower(this._value);
  }
  static downcast(o: Object): Callable | undefined {
    if (typeof o._lift() === 'function') {
      return Callable._lower(o._lift() as Function);
    } else {
      return undefined;
    }
  }
  upcast(): Object {
    return Object._lower(this._lift());
  }
  call(this_: Value, args: Array<Value>): Value {
    return ValueLower(this._value.apply(ValueLift(this_), args.map(ValueLift)));
  }
  construct(args: Array<Value>): Value {
    return ValueLower(new (this._value as any)(...args.map(ValueLift)));
  }
  _lift(): Function {
    return this._value;
  }
}

export class Object {
  private _value!: object;
  static _lower(v: any): Object {
    const o = new Object();
    o._value = v;
    return o;
  }
  private constructor() {}
  clone(): Object {
    return Object._lower(this._lift());
  }
  get(k: PropertyKey): Value {
    return ValueLower((this._value as any)[ValueLift(k)]);
  }
  set(k: PropertyKey, v: Value): boolean {
    return Reflect.set(this._value, ValueLift(k), ValueLift(v));
  }
  has(k: PropertyKey): boolean {
    return (ValueLift(k) in (this._value as any));
  }
  'delete'(k: PropertyKey): boolean {
    return (delete (this._value as any)[ValueLift(k)]);
  }
  _lift(): object {
    return this._value;
  }
}

export class Symbol {
  private _value!: symbol;
  static _lower(v: symbol): Symbol {
    const o = new Symbol();
    o._value = v;
    return o;
  }
  private constructor() {}
  clone(): Symbol {
    return Symbol._lower(this._lift());
  }
  _lift(): symbol {
    return this._value;
  }
}
