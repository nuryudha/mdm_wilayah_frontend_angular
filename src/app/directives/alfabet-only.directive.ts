import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlfabetOnly]',
})
export class AlfabetOnlyDirective {
  constructor(private _el: ElementRef) {}

  // @HostListener('input', ['$event']) onInputChange(event: any) {
  //   const initalValue = this._el.nativeElement.value;
  //   this._el.nativeElement.value = initalValue.replace(/[^a-zA-Z ]*/g, '');
  //   if (initalValue !== this._el.nativeElement.value) {
  //     event.stopPropagation();
  //   }
  // }
  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initialValue.replace(
      /[^a-zA-Z.\/() -]/g,
      ''
    );
    if (initialValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
