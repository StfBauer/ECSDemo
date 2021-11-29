import * as React from 'react';
import styles from './EcsDemo1.module.scss';
import { IEcsDemo1Props } from './IEcsDemo1Props';
import { escape } from '@microsoft/sp-lodash-subset';

import Cards from './Cards/Cards';

export default class EcsDemo1 extends React.Component<IEcsDemo1Props, {}> {
  public render(): React.ReactElement<IEcsDemo1Props> {
    return (
      <div className={ styles.ecsDemo1 }>
        <Cards title="Hello world"/>
        <Cards />
        <Cards />
      </div>
    );
  }
}
