'use strict';

// Some testing data
module.exports = {
  browser: {

  },
  messages: [
    {
      id: '1234-5678',
      from: 'OpenBazaar',
      subject: 'OpenBazaar 0.5 Release',
      summary: 'Welcome to OpenBazaar',
      body: `
        <h1>Welcome</h1>
        <p class="lead">You are now ready to join the world on a mission of freedom. Freedom to purchase, sell, and trade.</p>
        <h2>Some of the cool features we are working on:</h2>
        <ul>
          <li>Secure peer to peer merchants</li>
          <li>Anonymous ratings system</li>
          <li>Ricardian Contracts for various types of deals</li>
          <li>Third-party arbitration system</li>
          <li>Encrypted messaging and chat</li>
        </ul>
        <hr/>
        <div class="text-center">
          <h2>Want to help us change the world?</h2>
          <h3>Visit us at <a href="https://github.com/OpenBazaar/OpenBazaar" target="_blank">GitHub</a></h3>
        </div>
      `,
      date: new Date()
    }
  ],
  // markets
  peers: [
    {
      guid: 'd6fe8c82fb0abac17a702fd2a94effddd6fe8c82fb0abac17a702fd2a94herpd', 
      nick: 'Foo Bar Market',
      nickname: 'Foo Bar Market',
      text: 'Some info about this market.',
      email: 'foo@bar.com',
      contracts: [
        {
          item_title: 'One slightly used drinking straw',
          item_desc: 'Deal of a lifetime! Only used to drink a single 64oz Coca-Cola.',
          item_price: 1.25
        },
        {
          item_title: 'Disney Mouseketeer Costume',
          item_desc: 'Relive the old days with this not-at-all creepy costume.',
          item_price: 5
        },
      ],
      pubkey: 'pubkey',
      PGPPubKey: 'PGPPubKey'
    },
    {guid: 'd6fe8c82fb0abac17a702fd2a94eff37d6fe8c33fc0aeec17a702fd2a94eff37', nick: 'Foo Baz Market'},
  ]
};
