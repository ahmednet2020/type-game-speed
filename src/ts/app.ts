import { fromEvent, from, Observable, interval, of } from 'rxjs';
import { map } from 'rxjs/operators';

of(document.getElementsByTagName('section'))
.pipe(map(v => Array.from(v)))
.subscribe(v => {
	from(v).subscribe(v => console.log(v.className))
});