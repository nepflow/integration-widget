import { IntegrationWidgetConfig } from "../models/IntegrationWidgetConfig";

const load = (elementId: string, config: IntegrationWidgetConfig) => {
  console.debug('load', elementId, config);
}

export default load;
