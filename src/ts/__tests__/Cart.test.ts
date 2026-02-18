import Cart from '../service/Cart';
import Book from '../domain/Book';
import MusicAlbum from '../domain/MusicAlbum';
import Movie from '../domain/Movie';

describe('Корзина с разными типами товаров', () => {
    let cart: Cart;
    let book: Book;
    let album: MusicAlbum;
    let movie: Movie;

    beforeEach(() => {
        cart = new Cart();
        book = new Book(1001, 'Война и мир', 'Лев Толстой', 2000, 1225);
        album = new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900);
        movie = new Movie(
            1010,
            'Мстители',
            500,
            2012,
            'США',
            'Avengers Assemble!',
            'фантастика, боевик',
            137
        );
    });

    // СУЩЕСТВУЮЩИЕ ТЕСТЫ (оставьте их)
    test('должен добавлять фильм в корзину', () => {
        cart.add(movie);
        
        expect(cart.items).toContainEqual(movie);
        expect(cart.items.length).toBe(1);
    });

    test('должен содержать товары разных типов', () => {
        cart.add(book);
        cart.add(album);
        cart.add(movie);

        expect(cart.items.length).toBe(3);
        
        expect(cart.items[0]).toBeInstanceOf(Book);
        expect(cart.items[1]).toBeInstanceOf(MusicAlbum);
        expect(cart.items[2]).toBeInstanceOf(Movie);
    });

    test('должен возвращать копию массива items, а не оригинал', () => {
        cart.add(movie);
        
        const items = cart.items;
        items.pop();
        
        expect(cart.items.length).toBe(1);
        expect(items).not.toBe(cart.items);
    });

    // НОВЫЕ ТЕСТЫ (добавьте их)
    test('getTotalPrice должен правильно считать общую стоимость без скидки', () => {
        cart.add(book);
        cart.add(album);
        cart.add(movie);

        const total = cart.getTotalPrice();
        
        expect(total).toBe(3400);
    });

    test('getTotalPrice должен возвращать 0 для пустой корзины', () => {
        const total = cart.getTotalPrice();
        
        expect(total).toBe(0);
    });

    test('getTotalPriceWithDiscount должен правильно считать стоимость со скидкой', () => {
        cart.add(book);
        cart.add(album);
        cart.add(movie);

        const totalWithDiscount10 = cart.getTotalPriceWithDiscount(10);
        expect(totalWithDiscount10).toBe(3060);

        const totalWithDiscount25 = cart.getTotalPriceWithDiscount(25);
        expect(totalWithDiscount25).toBe(2550);

        const totalWithDiscount0 = cart.getTotalPriceWithDiscount(0);
        expect(totalWithDiscount0).toBe(3400);
    });

    test('getTotalPriceWithDiscount должен правильно работать с пустой корзиной', () => {
        const totalWithDiscount = cart.getTotalPriceWithDiscount(50);
        expect(totalWithDiscount).toBe(0);
    });

    test('removeItemById должен удалять товар по существующему id', () => {
        cart.add(book);
        cart.add(album);
        cart.add(movie);

        cart.removeItemById(1001);

        expect(cart.items.length).toBe(2);
        expect(cart.items).not.toContainEqual(book);
        expect(cart.items).toContainEqual(album);
        expect(cart.items).toContainEqual(movie);
    });

    test('removeItemById не должен ничего делать при удалении по несуществующему id', () => {
        cart.add(book);
        cart.add(album);

        cart.removeItemById(9999);

        expect(cart.items.length).toBe(2);
        expect(cart.items).toContainEqual(book);
        expect(cart.items).toContainEqual(album);
    });

    test('removeItemById не должен ничего делать при удалении из пустой корзины', () => {
        cart.removeItemById(1001);
        expect(cart.items.length).toBe(0);
    });
});