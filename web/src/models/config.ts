interface CustomCard {
  id: string; 
  name: string; 
  iconURL: string; 
  replacedZapierAppId?: string;
}

export interface Config {
  backgroundColor: string;
  cardColor: string;
  cardBorderColor: string;
  innerSpace: number;
  autoVerticalResize: boolean;
  customCards: CustomCard[];
}
