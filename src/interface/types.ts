export type BuiltInFormats =
  | "date-time"
  | "time"
  | "date"
  | "duration"
  | "email"
  | "idn-email"
  | "hostname"
  | "idn-hostname"
  | "ipv4"
  | "ipv6"
  | "uuid"
  | "uri"
  | "uri-reference"
  | "iri"
  | "iri-reference"
  | "uri-template"
  | "json-pointer"
  | "relative-json-pointer"
  | "regex";

// TODO: fix
export type Format = BuiltInFormats | string;
