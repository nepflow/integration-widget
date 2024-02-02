![image info](./assets/intro.png)

# Integration Widget

Add out integration to your app and allow users to explore **6,000+ Zapier integrations**.

[![Production Deployment](https://github.com/nepflow/integration-widget/actions/workflows/production.yaml/badge.svg?branch=main)](https://github.com/nepflow/integration-widget/actions/workflows/production.yaml)


[Installation](#installation) • [Build Widget](https://get-widget.nepflow.dev/) • [Documentation](https://docs.nepflow.dev/)

## Installation

Use [the online builder](https://get-widget.nepflow.dev) to customize the widget and get the installation code.

## JavaScript

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
    innerSpace: '24px',
    autoVerticalResize: true
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
    innerSpace: '24px',
    autoVerticalResize: true,
    onCardClick: function(id) {
      alert(id + ' clicked!')
    }
  });
</script>
```

You can use `nativeIntegrations` parameter to show your native integrations:

```html
<div id="integration-widget"></div>

<script src="https://widget.nepflow.dev/loader-v1.js"></script>
<script>
  nepflowWidget.load('integration-widget', {
    backgroundColor: '#f5f5f5',
    cardColor: '#fff',
    cardBorderColor: '#fff',
    innerSpace: '24px',
    autoVerticalResize: true,
    nativeIntegrations: [
      { id: 'msgcore', name: 'MsgCore', iconURL: 'https://app.msgcore.com/favicon-96x96.png' },
    ],
    onCardClick: function(id) {
      alert(id + ' clicked!')
    }
  });
</script>
```

### Or use with your existing framework:

- [**React JS**](https://github.com/nepflow/react-integration-widget/)

## Parameters

You can pass any of these parameters for your widget:

| Parameter          | Description                                        | Type                                               | Default   |
|--------------------|----------------------------------------------------|----------------------------------------------------|-----------|
| zapierAppI         | Your Zapier app ID or slug                         | `string`                                           | #f5f5f5   |
| backgroundColor    | The widget's background color (hex)                | `string`                                           | #ffffff   |
| cardColor          | The color for the card components (hex)            | `string`                                           | #ffffff   |
| cardBorderColor    | Card component border color (hex)                  | `string`                                           | #ffffff   |
| innerSpace         | The padding inside the widget (px)                 | `number`                                           | 24px      |
| verticalAutoResize | Enables automatic vertical resizing for the iframe | `boolean`                                          | false     |
| onCardClick        | Called when card is clicked                        | `(id: string) => void`                             | -         |
| nativeIntegrations | Array of native integrations                       | `{ id: string; name: string; iconURL: string; }[]` | -         |

## Technical Support or Questions

If you have questions or need help integrating the editor please [contact us](https://nepflow.dev/contact-us) instead of opening an issue.

## License

Apache License 2.0
