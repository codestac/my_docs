import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MyComponent } from './my.component'; // Replace with the actual path to your component
import { environment } from '../environment/environment';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            pipe: jasmine.createSpy('pipe').and.returnValue({
              subscribe: jasmine.createSpy('subscribe')
            })
          }
        }
      ]
    });

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should set label from environment', () => {
    const labelFromEnvironment = 'Test Label';
    environment.label = labelFromEnvironment;

    component.ngOnInit();

    expect(component.label).toEqual(labelFromEnvironment);
  });

  it('should hide dashboard when the URL includes "/dashboard"', () => {
    const navigationEndEvent: NavigationEnd = {
      urlAfterRedirects: '/dashboard',
      id: 1,
      url: '/dashboard',
      navigationTrigger: 'imperative',
    };

    router.pipe.and.returnValue({
      subscribe: (callback: (event: NavigationEnd) => void) => {
        callback(navigationEndEvent);
      },
    });

    component.ngOnInit();

    expect(component.showDashboard).toBe(false);
  });

  it('should show dashboard when the URL does not include "/dashboard"', () => {
    const navigationEndEvent: NavigationEnd = {
      urlAfterRedirects: '/other-page',
      id: 1,
      url: '/other-page',
      navigationTrigger: 'imperative',
    };

    router.pipe.and.returnValue({
      subscribe: (callback: (event: NavigationEnd) => void) => {
        callback(navigationEndEvent);
      },
    });

    component.ngOnInit();

    expect(component.showDashboard).toBe(true);
  });

  // Add more test cases as needed

});
