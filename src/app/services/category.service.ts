import { map, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges().pipe(map(category => {
        return category.map(c => ({key: c.payload.key, ...c.payload.val()}))
      }));
  }
}
