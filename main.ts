/**
 * Grove Slide Potentiometer Erweiterung
 */
//% color=#8f3fd1 icon="\uf20e" block="Schiebepotentiometer MG" 
//% groups=['Grundfunktionen', 'Erweiterungen']
namespace slider {

    let sensorPin: AnalogPin = AnalogPin.C16

    let minWert = 0
    let maxWert = 1023

    let letzterWert = 0

    /**
     * Initialisiert den Slide Potentiometer.
     */
    //% group="Grundfunktionen"
    //% block="Slide Potentiometer initialisieren an Pin %pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% pin.defl=AnalogPin.C16
    export function initialisieren(pin: AnalogPin): void {

        sensorPin = pin

        basic.pause(100)
    }

    /**
     * Liest den Rohwert (0–1023).
     */
    //% group="Grundfunktionen"
    //% block="Rohwert lesen"
    export function rohwert(): number {

        let wert = pins.analogReadPin(sensorPin)

        letzterWert = wert

        return wert
    }

    /**
     * Gibt den Wert in Prozent (0–100%) zurück.
     */
    //% group="Grundfunktionen"
    //% block="Wert in Prozent"
    export function prozent(): number {

        let wert = rohwert()

        let proz = Math.map(wert, 0, 1023, 0, 100)

        return Math.round(proz)
    }

    /**
     * Gibt den Wert skaliert auf einen Bereich zurück.
     */
    //% group="Erweiterungen"
    //% block="Wert skaliert von %von bis %bis"
    export function skaliert(von: number, bis: number): number {

        let wert = rohwert()

        return Math.map(wert, 0, 1023, von, bis)
    }

    /**
     * Kalibriert den Minimalwert.
     */
    //% group="Erweiterungen"
    //% block="setze Minimum auf aktuellen Wert"
    export function setzeMinimum(): void {

        minWert = rohwert()
    }

    /**
     * Kalibriert den Maximalwert.
     */
    //% group="Erweiterungen"
    //% block="setze Maximum auf aktuellen Wert"
    export function setzeMaximum(): void {

        maxWert = rohwert()
    }

    /**
     * Gibt Wert basierend auf Kalibrierung zurück (0–100%)
     */
    //% group="Erweiterungen"
    //% block="kalibrierter Prozentwert"
    export function kalibriert(): number {

        let wert = rohwert()

        let proz = Math.map(wert, minWert, maxWert, 0, 100)

        return Math.round(proz)
    }

    /**
     * Gibt true zurück, wenn sich der Wert stark verändert hat.
     */
    //% group="Erweiterungen"
    //% block="Wert hat sich um mehr als %schwelle geändert"
    //% schwelle.defl=10
    export function hatSichGeaendert(schwelle: number): boolean {

        let aktuell = rohwert()

        let delta = Math.abs(aktuell - letzterWert)

        letzterWert = aktuell

        return delta > schwelle
    }

    /**
     * Wartet bis der Slider einen bestimmten Prozentwert erreicht.
     */
    //% group="Erweiterungen"
    //% block="warte bis Wert %ziel % erreicht"
    //% ziel.defl=50
    export function warteBisProzent(ziel: number): void {

        while (prozent() < ziel) {

            basic.pause(50)
        }
    }

    /**
     * Gibt true zurück, wenn Wert über Prozent-Schwelle liegt.
     */
    //% group="Erweiterungen"
    //% block="Wert über %schwelle %"
    //% schwelle.defl=50
    export function ueberSchwelle(schwelle: number): boolean {

        return prozent() > schwelle
    }
}
