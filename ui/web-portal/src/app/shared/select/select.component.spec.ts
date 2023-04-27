import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectItemComponent } from './select-item/select-item.component';

describe('MultipleSelectComponent', () => {
	let component: SelectItemComponent;
	let fixture: ComponentFixture<SelectItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SelectItemComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SelectItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
