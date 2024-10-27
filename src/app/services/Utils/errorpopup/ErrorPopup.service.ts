import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { ErrorPopupComponent } from './ErrorPopup.Component';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  showError(message: string) {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(ErrorPopupComponent)
      .create(this.injector);

    componentRef.instance.open(message);

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Auto cerrar después de 3 segundos (opcional)
    setTimeout(() => {
      this.close(componentRef);
    }, 15000);
  }

  close(componentRef: any) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
