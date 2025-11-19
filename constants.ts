import { Song, Setlist } from './types';

export const DEFAULT_CATEGORIES = ['Worship', 'Rock Nacional', 'Pop', 'MPB', 'Jazz'];

export const MOCK_SONGS: Song[] = [
  {
    id: '1',
    title: 'Tempo Perdido',
    artist: 'Legião Urbana',
    originalKey: 'C',
    category: 'Rock Nacional',
    content: `
[Intro] C  Am7  Bm  Em 
        C  Am7  Bm  Em

C           Am7
Todos os dias quando acordo
Bm                Em
Não tenho mais o tempo que passou
C               Am7
Mas tenho muito tempo
Bm                 Em
Temos todo o tempo do mundo

C           Am7
Todos os dias antes de dormir
Bm                  Em
Lembro e esqueço como foi o dia
C               Am7
Sempre em frente
Bm                Em
Não temos tempo a perder

C            Am7
Nosso suor sagrado
Bm                 Em
É bem mais belo que esse sangue amargo
C             Am7
E tão sério
Bm            Em
E selva...gem
`
  },
  {
    id: '2',
    title: 'Anunciação',
    artist: 'Alceu Valença',
    originalKey: 'G',
    category: 'MPB',
    content: `
[Intro] G  Em  C  D7
        G  Em  C  D7

G                   Em
Na bruma leve das paixões
           C            D7
Que vêm de dentro
G                   Em
Tu vens chegando pra brincar
          C          D7
No meu quintal

G                   Em
No teu cavalo, peito nu
          C           D7
Cabelo ao vento
G                   Em
E o sol quarando nossas roupas
       C          D7
No varal
`
  },
  {
    id: '3',
    title: 'Oceans (Where Feet May Fail)',
    artist: 'Hillsong United',
    originalKey: 'D',
    category: 'Worship',
    content: `
[Intro] Bm  A/C#  D  A  G

Bm         A/C#   D
You call me out upon the waters
          A                  G
The great unknown where feet may fail
Bm          A/C#   D
And there I find You in the mystery
           A                G
In oceans deep my faith will stand

G          D             A
And I will call upon Your name
G           D              A
And keep my eyes above the waves
             G
When oceans rise
         D               A
My soul will rest in Your embrace
            G      A    Bm
For I am Yours and You are mine
`
  }
];

export const MOCK_SETLISTS: Setlist[] = [
  {
    id: 'list-1',
    name: 'Domingo Manhã',
    description: 'Culto principal',
    songIds: ['3', '1'],
    createdAt: Date.now()
  },
  {
    id: 'list-2',
    name: 'Barzinho Sexta',
    description: 'Repertório leve',
    songIds: ['1', '2'],
    createdAt: Date.now()
  }
];