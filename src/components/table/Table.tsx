import './table.scss'
import { FC } from 'react'
import { CharCard } from '../../interfaces'
interface Tableprops {
    card: CharCard
}

export const Table: FC<Tableprops> = (props) => {
    const {
        name = "",
        image = "",
        status = "",
        species = "",
        gender = "",
        characterLocation = "",
        dimension = " ",
        appearances: populatiry = ""
    } = props.card
    return (
        <div className="table-wrapper">
            <div className="image">
                <img src={image} alt="" />
            </div>
            <div className="card">
                <div className="row">
                    <div className="title">Character Name</div>
                    <div className="info">{name}</div>
                </div>
                <div className="row">
                    <div className="title">Origin & Dimentions</div>
                    <div className="info">{characterLocation}&nbsp;{dimension}</div>
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
                    <div className="title">Populatity</div>
                    <div className="info">{populatiry}</div>
                </div>
            </div>
        </div>
    )
}