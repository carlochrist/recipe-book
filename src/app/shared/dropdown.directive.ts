import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue')
    // this.renderer.addClass(this.elementRef.nativeElement, 'open')
  }

  // @HostListener('mouseenter') mouseover() {
  //   this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue')
  // }

}
