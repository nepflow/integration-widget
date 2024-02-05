# Integration Widget

The widget allows your users to explore 6,000+ Zapier integrations right inside your app.

Learn more about the widget on our website: [nepflow.dev](https://nepflow.dev)

[![Production Deployment](https://github.com/nepflow/integration-widget/actions/workflows/production.yaml/badge.svg?branch=main)](https://github.com/nepflow/integration-widget/actions/workflows/production.yaml)
[![@nepflow/integration-widget.svg](https://img.shields.io/npm/v/@nepflow/integration-widget.svg)](https://www.npmjs.com/package/@nepflow/integration-widget)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

[Get started](#installation) • [Live Demo](https://demo.nepflow.dev/) • [Build Widget](https://demo.nepflow.dev/) • [Documentation](https://docs.nepflow.dev/) • [NPM package](https://www.npmjs.com/package/@nepflow/integration-widget)

<img alt="Nepflow widget with 6,000+ Zapier integrations" src="https://raw.githubusercontent.com/nepflow/integration-widget/main/web/assets/intro-v3.png" style="max-width: 800px; width: 100%; margin: 12px 0;" />

## Installation

You can use [the online builder](https://demo.nepflow.dev) to customize the widget and get the installation code.

### Node.js package

Install the package via NPM or Yarn

```bash
npm install @nepflow/integration-widget --save
```

Import module in your application

```javascript
import NepflowIntegrationWidget from '@nepflow/integration-widget';
```

### Load from CDN

You can load specific version of package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@nepflow/integration-widget).

```html
<script src="https://cdn.jsdelivr.net/npm/@nepflow/integration-widget@1/dist/bundle.js"></script>
```

## Configuration

### Add element

Create an element that should contain the widget
```html
<div id="integration-widget"></div>
```

### Initialization

Basic usage:

```javascript
const widget = new NepflowIntegrationWidget(
  'integration-widget', // Element ID
  {
    backgroundColor: '#f5f5f5',
    cardColor: '#fff',
    cardBorderColor: '#fff',
    innerSpace: 24,
    autoVerticalResize: true,
    onCardClick: function(id) {
      alert(id + ' clicked!')
    }
  }
);
```

If your app is integrated with [Zapier](https://zapier.com/), your users can see [integration guides](https://nepflow.dev/#guides):

```javascript
const widget = new NepflowIntegrationWidget(
  'integration-widget', // Element ID
  {
    zapierAppId: '<ZAPIER APP SLUG>', // Your Zapier app key
    backgroundColor: '#f5f5f5',
    cardColor: '#fff',
    cardBorderColor: '#fff',
    innerSpace: 24,
    autoVerticalResize: true,
    onCardClick: function(id) {
      console.log('card clicked:', id)
    }
  }
);
```

You can use `customCards` parameter to show your native integrations and replacing existing Zapier apps:

```javascript
const widget = new NepflowIntegrationWidget(
  'integration-widget', // Element ID
  {
    zapierAppId: '<ZAPIER APP SLUG>', // Your Zapier app key
    backgroundColor: '#f5f5f5',
    cardColor: '#fff',
    cardBorderColor: '#fff',
    innerSpace: 24,
    autoVerticalResize: true,
    customCards: [
      // Showing a custom integration in the catalog
      { 
        id: 'custom_integration', 
        name: 'Custom Integration', 
        iconURL: 'https://example.com/foobar.png' 
      },

      // Replacing an existing Zapier app in the catalog
      {
        id: 'gmail', 
        name: 'Gmail', 
        iconURL: 'https://example.com/gmail.png',
        replacedZapierAppId: 'gmail'
      },
    ],
    onCardClick: function(id) {
      alert(id + ' clicked!')
    }
  }
);
```

<!-- ### Use with your existing framework

- [**React JS**](https://github.com/nepflow/react-integration-widget/) -->

## Parameters

You can pass any of these parameters for your widget:

| Parameter          | Description                                        | Type                                               | Default   |
|--------------------|----------------------------------------------------|----------------------------------------------------|-----------|
| zapierAppId        | Your Zapier app ID or slug                         | `string`                                           | #f5f5f5   |
| backgroundColor    | The widget's background color (hex)                | `string`                                           | #ffffff   |
| cardColor          | The color for the card components (hex)            | `string`                                           | #ffffff   |
| cardBorderColor    | Card component border color (hex)                  | `string`                                           | #ffffff   |
| innerSpace         | The padding inside the widget (px)                 | `number`                                           | 24        |
| autoVerticalResize | Enables automatic vertical resizing for the iframe | `boolean`                                          | false     |
| onCardClick        | Called when card is clicked                        | `(id: string) => void`                             | -         |
| customIntegrations | Array of custom or native integrations             | `{ id: string; name: string; iconURL: string; replacedZapierAppId: string; }[]` | []        |

## Technical Support or Questions

If you have questions or need help integrating the editor please [contact us](https://nepflow.dev/contact-us) instead of opening an issue.

## License

Apache License 2.0
