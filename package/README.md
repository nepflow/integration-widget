<img alt="Nepflow widget with 6,000+ Zapier integrations" src="https://raw.githubusercontent.com/nepflow/integration-widget/main/web/assets/intro-v3.png" style="max-width: 800px; width: 100%; margin-bottom: 24px;" />

# Integration Widget

The widget allows your users to explore **6,000+ Zapier integrations** right inside your app.

[![Production Deployment](https://github.com/nepflow/integration-widget/actions/workflows/production.yaml/badge.svg?branch=main)](https://github.com/nepflow/integration-widget/actions/workflows/production.yaml)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

[Get started](#getting-started) • [Live Demo](https://demo.nepflow.dev/) • [Build Widget](https://demo.nepflow.dev/) • [Documentation](https://docs.nepflow.dev/)

## Getting started

You can use [the online builder](https://demo.nepflow.dev) to customize the widget and get the installation code.

### Use installation script

If your app is integrated with [Zapier](https://zapier.com/):

```html
<div id="integration-widget"></div>

<script src="https://widget.nepflow.dev/loader-v1.js"></script>
<script>
  nepflowWidget.load('integration-widget', {
    zapierAppId: '<ZAPIER APP ID>', // Your Zapier app ID or slug
    backgroundColor: '#f5f5f5',
    cardColor: '#fff',
    cardBorderColor: '#fff',
    innerSpace: 24,
    autoVerticalResize: true
  });
</script>
```

You can use `customIntegrations` parameter to show your native integrations:

```html
<div id="integration-widget"></div>

<script src="https://widget.nepflow.dev/loader-v1.js"></script>
<script>
  nepflowWidget.load('integration-widget', {
    zapierAppId: '<ZAPIER APP ID>', // Your Zapier app ID or slug
    backgroundColor: '#f5f5f5',
    cardColor: '#fff',
    cardBorderColor: '#fff',
    innerSpace: '24px',
    autoVerticalResize: true,
    customIntegrations: [
      // Showing a new integration in the catalog
      { 
        id: 'new_integration', 
        name: 'New Integration', 
        iconURL: 'https://example.com/new_integration.png' 
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
  });
</script>
```

If your app is not integrated with Zapier yet:

```html
<div id="integration-widget"></div>

<script src="https://widget.nepflow.dev/loader-v1.js"></script>
<script>
  nepflowWidget.load('integration-widget', {
    backgroundColor: '#f5f5f5',
    cardColor: '#fff',
    cardBorderColor: '#fff',
    innerSpace: 24,
    autoVerticalResize: true,
    onCardClick: function(id) {
      alert(id + ' clicked!')
    }
  });
</script>
```

### Use with your existing framework

- [**React JS**](https://github.com/nepflow/react-integration-widget/)

## Parameters

You can pass any of these parameters for your widget:

| Parameter          | Description                                        | Type                                               | Default   |
|--------------------|----------------------------------------------------|----------------------------------------------------|-----------|
| zapierAppId        | Your Zapier app ID or slug                         | `string`                                           | #f5f5f5   |
| backgroundColor    | The widget's background color (hex)                | `string`                                           | #ffffff   |
| cardColor          | The color for the card components (hex)            | `string`                                           | #ffffff   |
| cardBorderColor    | Card component border color (hex)                  | `string`                                           | #ffffff   |
| innerSpace         | The padding inside the widget (px)                 | `number`                                           | 24        |
| verticalAutoResize | Enables automatic vertical resizing for the iframe | `boolean`                                          | false     |
| onCardClick        | Called when card is clicked                        | `(id: string) => void`                             | -         |
| customIntegrations | Array of custom or native integrations             | `{ id: string; name: string; iconURL: string; replacedZapierAppId: string; }[]` | []        |

## Technical Support or Questions

If you have questions or need help integrating the editor please [contact us](https://nepflow.dev/contact-us) instead of opening an issue.

## License

Apache License 2.0
