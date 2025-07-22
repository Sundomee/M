import { Directive, inject, model, signal } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";

@Directive()
export class DlControlBaseComponent<T> implements ControlValueAccessor {

    protected readonly value = model<T>()
    protected readonly disabled = signal<boolean>(false)

    protected _onChange = (_: any) => { }
    protected _onTouched = () => { }

    private readonly ngControl = inject(NgControl, { optional: true, self: true })

    constructor() {
        if (this.ngControl) this.ngControl.valueAccessor = this;
    }

    registerOnChange(fn: any): void {
        this._onChange = fn
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled)
    }

    writeValue(value: T): void {
        this.value.set(value)
    }

    protected _handleChange(value: T) {
        this.value.set(value)
        this._onChange(value)
    }
}