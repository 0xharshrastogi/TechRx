import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectItemComponent } from './select-item/select-item.component';
import { SelectComponent } from './select.component';

describe('MultipleSelectComponent', () => {
	let component: SelectComponent;
	let fixture: ComponentFixture<SelectComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SelectItemComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
