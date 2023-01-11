import './card.scss'
import { FC } from 'react'

export const Card: FC<CardFC> = ({card}) => {
    const {
        name = "",
        image = "",
        status = "",
        species = "",
        gender = "",
        characterLocation = "",
        dimension = " ",
        appearances: popularity = ""
    } = card
    return (
        <div className="table-wrapper">
            <div className="image">
                <img src={image} alt="" />
            </div>
            <div className="card">
                <div className="rows">
                    <div className="row">
                        <div className="title">Character Name</div>
                        <div className="info">{name}</div>
                    </div>
                    <div className="row">
                        <div className="title">Origin & Dimentions</div>
                        <div className="info">{characterLocation} {dimension}</div>
                    </div>
                    <div className="row">
                        <div className="title">Status</div>
                        <div className="info">{status}</div>
                    </div>
                    <div className="row">
                        <div className="title">Species</div>
                        <div className="info">{species}</div>
                    </div>
                    <div className="row">
                        <div className="title">Gender</div>
                        <div className="info">{gender}</div>
                    </div>
                    <div className="row">
                        <div className="title">Popularity</div>
                        <div className="info">{popularity}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}