// Test currently developing
// Due to db's integrity, a totally external db is tested
import { Create } from './Components/CreateAccount/Create';
import firebaseAdmin from './firebase'; 
 
describe('createANewUser', () => {
  it('creates a user', async () => {
    const set = firebaseAdmin
      .database()
      .ref()
      .push().set;
 
    const result = Create(
        'Olivverde',
        'Fras2khvhSS',
        true,
        'oliver.milian@gmial.com',
        'Oliver',
        '34244328',
        'UVG',
        'Z 12',
        'SOMOS',
        'Church',
    );
 
    await expect(result).resolves.toEqual(true);
 
    expect(set).toHaveBeenCalledTimes(1);
 
    expect(set).toHaveBeenCalledWith({
        username: 'Olivverde',
        password: 'Fras2khvhSS',
        confirm: true,
        email: 'oliver.milian@gmial.com',
        name: 'Oliver',
        phone: '34244328',
        workplace: 'UVG',
        residence: 'Z 12',
        church: 'SOMOS',
        categories: 'Church',
    });
  });
});