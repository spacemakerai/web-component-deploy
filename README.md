# Web component deploy

Node command line utility that helps you upload web components to S3. It uses
the version of the client package and uploads one copy per `major`, `major.minor`,
`major.minor.patch`, and `latest` respectively.

## Usage

```
Usage: web-component-deploy [options]

Options:
  -V, --version                          output the version number
  -d, --destination <destination>        S3 destination (e.g. s3://my-static-host/web-components)
  -n, --component-name <component-name>  Component name
  -s, --src <src>                        folder to sync
  -h, --help                             output usage information
```

## Adding to your project

Add the package to your project's dependencies:

```bash
$ yarn add --dev @spacemakerai/web-component-deploy
```

Then run the `web-component-deploy` command as a part of your deployment command,
i.e. add something to your `package.json` like this:

```json
{
    ...,
    "scripts": {
        "deploy": "yarn build && web-component-deploy -s ./dist -n counter -d s3://my-components/web/",
    }
}
```

## Developing

Developer guide for this component is found at [DEVELOPER.md](DEVELOPER.md).
