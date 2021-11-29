import * as React from 'react';
import styles from './Cards.module.scss';
export interface ICardProps {
    img?: string;
    title?: string;
    location?: string;
}

export default class Cards extends React.Component<ICardProps, {}> {
    public render(): React.ReactElement<ICardProps> {
        return (
            <div className={styles["hoo-doccard"]}>
                <div className={styles["hoo-cardimage"]}>
                    <img src="https://lab.n8d.studio/htwoo/htwoo-core/images/card-images/coffee-image.jpg" width="320" height="180" alt="" />
                </div>
                <div className={styles["hoo-cardlocation"]}>Marketing</div>
                <div className={styles["hoo-cardtitle"]}>{ this.props.title || "notitle" }</div>
                <div className={styles["hoo-cardfooter"]}>
                    <div className={styles["hoo-avatar"]}>
                        <img src="https://lab.n8d.studio/htwoo/htwoo-core/images/mug-shots/astronaut-mugshot-001.jpg" alt="" className={styles["hoo-avatar-img"]} loading="lazy" />
                    </div>
                    <div className="hoo-cardfooter-data">
                        <div className={styles["hoo-cardfooter-name"]}>Man on the moon</div>
                        <div className={styles["hoo-cardfooter-modified"]}>Created a seconds ago</div>
                    </div>
                </div>
            </div>
        );
    }
}
