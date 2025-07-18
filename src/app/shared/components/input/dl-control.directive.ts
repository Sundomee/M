import { Directive, forwardRef, inject, OnInit, Renderer2, TemplateRef, ViewContainerRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from "@angular/forms";
import { DlInputComponent } from "./input.component";

@Directive({
    selector: 'dlControl',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DlInputComponent),
            multi: false
        }
    ]
})
export class DlControlDirective implements ControlValueAccessor, OnInit {

    public element: HTMLInputElement | null = null
    
    private readonly templateRef = inject(TemplateRef)
    private readonly viewContainerRef = inject(ViewContainerRef)

    private _onChange = (_: any) => {}
    private _onTouched = () => {}

    private readonly ngControl = inject(NgControl, {optional: true, self: true})
    private readonly _renderer = inject(Renderer2);


    
    
    ngOnInit(): void {
       this.element = this.templateRef.elementRef.nativeElement
    }


    updateControllerValue(event: Event) {
        if (this._onChange) this._onChange((event.target as HTMLInputElement).value)
      }
  
      registerOnChange(fn: any): void {
          this._onChange = fn
      }
  
      registerOnTouched(fn: any): void {
          this._onTouched = fn
      }
  
      setDisabledState(isDisabled: boolean): void {
          this._renderer.setProperty(this.element, 'disabled', isDisabled)
      }
  
      writeValue(value: string): void {
          this._renderer.setProperty(this.element, 'value', value)
      }
}