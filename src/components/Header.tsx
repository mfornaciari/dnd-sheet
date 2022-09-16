import '../style/style.css';

export default function Header() {
  const raceNames = [
    'Anão',
    'Draconato',
    'Elfo',
    'Gnomo',
    'Humano',
    'Meio-elfo',
    'Meio-orc',
    'Pequenino',
    'Tiferino'
  ];
  const classNames = [
    'Bárbaro',
    'Bardo',
    'Bruxo',
    'Clérigo',
    'Druida',
    'Feiticeiro',
    'Guardião',
    'Guerreiro',
    'Ladino',
    'Mago',
    'Monge',
    'Paladino'
  ];
  // const levels = [
  //   '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
  // ];

  return (
    <header>
      <label htmlFor='nameInput'>Nome</label>
      <input type='text' id='nameInput' placeholder='Nome do personagem' />

      <label htmlFor='raceInput'>Raça</label>
      <select id='raceInput'>
        {raceNames.map((raceName, index) => <option key={index} value={index}>{raceName}</option>)}
      </select>

      <label htmlFor='classInput'>Classe</label>
      <select id='classInput'>
        {classNames.map((className, index) => <option key={index} value={index}>{className}</option>)}
      </select>

      <label htmlFor='xpInput'>Experiência</label>
      <input type='number' id='xpInput' min='0' />
      <div role='region' aria-labelledby='level'>
        <span id='level'>Nível</span> <span>1</span>
      </div>
    </header>
  );
}
