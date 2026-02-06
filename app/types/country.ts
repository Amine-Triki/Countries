export interface Country {
  cca3: string;
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  capital?: string[];
  region: string;
  population: number;
  flags: {
    svg: string;
    png?: string;
  };
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
  timezones?: string[];
}
