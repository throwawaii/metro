import MetroMap from '../../MetroMap'

export interface Widget {
    addTo(metroMap: MetroMap): this
}

export abstract class DeferredWidget {
    protected _whenAvailable: Promise<void>
    get whenAvailable() {
        return this._whenAvailable
    }
}
