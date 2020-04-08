import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/products')
      .snapshotChanges().pipe(map(product => {
        return product.map(p => ({ key: p.payload.key, ...p.payload.val() as Object }))
      }));
  }

  getById(id) {
    return this.db.object('/products/' + id).valueChanges();
  }

  save(product) {
    return this.db.list('/products').push(product);
  }

  update(id, product) {
    return this.db.object('/products/' + id).update(product);
  }

  delete(id) {
    return this.db.object('/products/' + id).remove();
  }
}
