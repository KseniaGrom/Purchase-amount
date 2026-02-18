import Movie from '../domain/Movie';

describe('Класс Movie', () => {
    test('должен создавать объект фильма со всеми свойствами', () => {
        const movie = new Movie(
            1010,
            'Мстители',
            500,
            2012,
            'США',
            'Avengers Assemble!',
            'фантастика, боевик',
            137
        );

        expect(movie).toEqual({
            id: 1010,
            name: 'Мстители',
            price: 500,
            year: 2012,
            country: 'США',
            slogan: 'Avengers Assemble!',
            genre: 'фантастика, боевик',
            duration: 137
        });
    });

    test('должен правильно реализовывать интерфейс Buyable', () => {
        const movie = new Movie(
            1010,
            'Мстители',
            500,
            2012,
            'США',
            'Avengers Assemble!',
            'фантастика, боевик',
            137
        );

        expect(movie.id).toBeDefined();
        expect(movie.name).toBeDefined();
        expect(movie.price).toBeDefined();
        
        expect(typeof movie.id).toBe('number');
        expect(typeof movie.name).toBe('string');
        expect(typeof movie.price).toBe('number');
        expect(typeof movie.year).toBe('number');
        expect(typeof movie.country).toBe('string');
        expect(typeof movie.slogan).toBe('string');
        expect(typeof movie.genre).toBe('string');
        expect(typeof movie.duration).toBe('number');
    });
});