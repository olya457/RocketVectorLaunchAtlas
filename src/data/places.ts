import { Place } from '../types/navigation';

export const places: Place[] = [
  {
    id: 'kennedy',
    name: 'Kennedy Space Center',
    latitude: 28.5729,
    longitude: -80.649,
    description:
      'This is one of the most famous spaceports in the world, located in the state of Florida. It was from here that the Apollo missions launched, including the manned flight to the moon. Today, the center is used for launches of modern rockets, and is also a popular place for visitors. Here you can see launch pads, real rockets, and exhibitions dedicated to the history of space. The territory combines technical infrastructure and natural protected areas, which creates a unique atmosphere. This place symbolizes the development of space technology and remains one of the main launch centers in the world.',
    image: require('../assets/kennedy.png'),
  },
  {
    id: 'baikonur',
    name: 'Baikonur Cosmodrome',
    latitude: 45.9203,
    longitude: 63.3422,
    description:
      'The oldest and one of the largest spaceports in the world, located in Kazakhstan. It was here that the first launch of an artificial Earth satellite and the first human flight into space took place. Baikonur has great historical value and is still actively used for rocket launches. The territory includes numerous launch pads, technical complexes and infrastructure for flight preparation. Despite its age, the cosmodrome continues to play an important role in international space programs. This is the place where humanity\u2019s space age began.',
    image: require('../assets/baikonur.png'),
  },
  {
    id: 'guiana',
    name: 'Guiana Space Center',
    latitude: 5.239,
    longitude: -52.768,
    description:
      'Located in French Guiana, this cosmodrome is conveniently located near the equator, which allows it to save fuel during launches. This makes it one of the most efficient places to put satellites into orbit. European rockets are launched here, as well as international missions. The cosmodrome is equipped with modern infrastructure and supports various types of launches. Its geographical location makes it strategically important for the space industry. This is an example of how natural conditions can affect the development of technology.',
    image: require('../assets/guiana.png'),
  },
  {
    id: 'vandenberg',
    name: 'Vandenberg',
    latitude: 34.742,
    longitude: -120.5724,
    description:
      'A spaceport on the coast of California used for launches into polar orbits. Its location allows rockets to be safely launched over the ocean. Vandenberg is often used for scientific and military missions, as well as for launching observation satellites. It regularly hosts launches of modern rockets, including private space programs. The site combines high-tech infrastructure with a rugged natural landscape. It is one of the key spaceports in the United States.',
    image: require('../assets/vandenberg.png'),
  },
  {
    id: 'tanegashima',
    name: 'Tanegashima Space Center',
    latitude: 30.4017,
    longitude: 130.976,
    description:
      'Japan\u2019s main spaceport, located on the island of Tanegashima. It is known for its cleanliness, precision, and modern technology. The center is used for launching satellites and research missions. Its location near the ocean ensures safe conditions for launches. The spaceport is also known for its aesthetics \u2014 it looks almost like a futuristic complex in the middle of nature. It is an example of the harmony of technology and the environment.',
    image: require('../assets/tanegashima.png'),
  },
  {
    id: 'satish',
    name: 'Satish Dhawan Space Center',
    latitude: 13.7199,
    longitude: 80.2304,
    description:
      'The main spaceport of India, located on the island of Sriharikota. It plays an important role in the development of the Indian space program. Rockets are launched from here for the exploration of the Moon, Mars and satellite missions. The center has modern launch complexes and is actively developing. Its geographical location allows for the efficient execution of various types of launches. It is one of the most dynamic spaceports in the world.',
    image: require('../assets/satish_dhawan.png'),
  },
  {
    id: 'plesetsk',
    name: 'Plesetsk Cosmodrome',
    latitude: 62.9256,
    longitude: 40.5776,
    description:
      'Located in the northern part of Russia, this spaceport specializes in launching military and scientific satellites. Its remote location ensures a high level of security. Plesetsk is actively used for launches to polar orbits. It has a complex infrastructure and plays an important role in space programs. Despite the harsh climate, the cosmodrome operates stably. It is one of the key facilities of the space industry.',
    image: require('../assets/plesetsk.png'),
  },
];

export const getPlaceById = (id: string) => places.find(p => p.id === id);
