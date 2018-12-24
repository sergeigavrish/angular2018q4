import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { BreadcrumpsComponent } from './components/breadcrumps/breadcrumps.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { UserPreviewComponent } from './components/user-preview/user-preview.component';
import { TitleComponent } from './components/title/title.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    BreadcrumpsComponent,
    SignInComponent,
    SignOutComponent,
    UserPreviewComponent,
    TitleComponent,
    SearchPanelComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, FooterComponent, BreadcrumpsComponent, SearchPanelComponent]
})
export class SharedModule { }
