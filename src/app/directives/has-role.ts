import { Directive, TemplateRef, ViewContainerRef, inject, input, effect } from '@angular/core';
import { SessionStore } from '@services/session-store';

@Directive({
  selector: '[hasRole]',
})
export class HasRole {
  private readonly templateRef = inject(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)
  private readonly session = inject(SessionStore)

  // el valor que se le pasa = hasRole="'admin'"
  readonly hasRole = input.required<string>();

  constructor() {
    effect(()=> {
      const tieneAcceso = this.session.rol() === this.hasRole();

      this.viewContainer.clear();
      if(tieneAcceso){
        this.viewContainer.createEmbeddedView(this.templateRef)
      }
    })
  }
}
