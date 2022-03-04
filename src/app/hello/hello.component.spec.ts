import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { HelloComponent } from './hello.component';
import { HelloModule } from './hello.module';

describe('HelloComponent', () => {
  it('should initially render "Hello world" heading', async () => {
    await getTestBed();

    const heading = getHeading(/hello\s+world/i);
    expect(heading);
  });

  it('should initially have an input with "Greeting Target" label', async () => {
    await getTestBed();

    const input = getInput();
    expect(input);
    expect(input.value).toBe('world');
  });

  it('should render "Hello Angular" when "Angular" is typed in the input', async () => {
    await getTestBed();

    const input = getInput();
    input.setSelectionRange(0, 99);
    userEvent.type(input, '{backspace}Angular');

    const heading = getHeading(/hello\s+angular/i);
    expect(heading);
  });
});

async function getTestBed() {
  return render(HelloComponent, {
    excludeComponentDeclaration: true,
    imports: [HelloModule]
  });
}

function getHeading(name: string | RegExp) {
  // getByRole('heading') doesn't work for some reason
  // return screen.getByRole('heading', { name, level: 1 });

  return screen.getByText(name, { selector: 'h1' });
}

function getInput() {
  return screen.getByLabelText('Greeting Target') as HTMLInputElement;
}
