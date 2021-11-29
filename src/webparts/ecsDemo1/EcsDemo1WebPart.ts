import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme,
  ISemanticColors
} from '@microsoft/sp-component-base';

import * as strings from 'EcsDemo1WebPartStrings';
import EcsDemo1 from './components/EcsDemo1';
import { IEcsDemo1Props } from './components/IEcsDemo1Props';

export interface IEcsDemo1WebPartProps {
  description: string;
}

export default class EcsDemo1WebPart extends BaseClientSideWebPart<IEcsDemo1WebPartProps> {

  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  private setCSSVariables(theming: any) {

    // request all key defined in theming
    let themingKeys = Object.keys(theming);
    // if we have the key
    if (themingKeys !== null) {
      // loop over it
      themingKeys.forEach(key => {
        // add CSS variable to style property of the web part
        this.domElement.style.setProperty(`--${key}`, theming[key])

      });

    }

  }

  protected onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    if (this._themeVariant) {
      this.setCSSVariables(this._themeVariant.palette);
      this.setCSSVariables(this._themeVariant.effects);
      this.setCSSVariables(this._themeVariant.semanticColors);
      this.setCSSVariables(this._themeVariant.spacing);
    }

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    return super.onInit();
  }

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.setCSSVariables(this._themeVariant.palette);
    this.setCSSVariables(this._themeVariant.effects);
    this.setCSSVariables(this._themeVariant.semanticColors);
    this.setCSSVariables(this._themeVariant.spacing);
    // this.render();
  }


  public render(): void {

    if (this.context.sdks.microsoftTeams) {
      console.log(' Hello world ');
    } else {

      const element: React.ReactElement<IEcsDemo1Props> = React.createElement(
        EcsDemo1,
        {
          description: this.properties.description
        }
      );
      ReactDom.render(element, this.domElement);
    }


  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
