import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectItemComponent } from './select-item.component';

describe('MultiSelectItemComponent', () => {
	let component: SelectItemComponent<unknown>;
	let fixture: ComponentFixture<SelectItemComponent<unknown>>;

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
