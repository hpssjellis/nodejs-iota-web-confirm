var express = require('express');
var app = express();

const iotaLibrary = require('@iota/core')
const Converter = require('@iota/converter')


const mySeed = 'DONOTSTOREYOURSEEDONAPUBLICGITHUBSITEASANYONECANSTEALALLYOUR9IOTATOKENSKEEPITSAFE'   //Your secret seed. All your tokens

global.myRecieveIndex = 0    // defines when to start showing the replies! Careful will not show results if above latest recive address



global.myReceiveAddress = '' // This will be auto generated

global.myArrayOfAddresses = new Array()

global.myResponse0 = ''
global.myResponse1 = ''
global.myResponse2 = ''

global.myPendingAddress = ' '

global.myLatestAddress = ''

global.myNotStartup = false

//global.myRepeatRun = false



const iota = iotaLibrary.composeAPI({
    provider: 'https://nodes.iota.cafe:443'   // This is the main net not development
})   //  provider: 'https://nodes.devnet.thetangle.org:443'  // dev net

// find other nodes at https://nodes.iota.works/

// https://nodes.iota.cafe:443
// https://www.iotaqubic.us:443
// https://ultranode.iotatoken.nl:443
// https://perma.iota.partners:443

// https://iotanode.us:443  // may have over used this







async function myLoadAddressesFromSeed(myPassedSeed){

	var options = {
        index : global.myRecieveIndex,
        checksum: true,
		security: 2,
        returnAll: true

	}


iota
  .getNewAddress(myPassedSeed, options)
  .then(myGenAddress => {
     console.log('Your set of address are (unused is last): ' + JSON.stringify(myGenAddress, null, 3) )
  //   global.myResponse0 = '<h2>My Next '+myMaxArray+' Addresses: </h2>' + '<pre id="myPre01">'+JSON.stringify(myGenAddress, null, 3)+'</pre>' + '<hr>';  // hopefully this is global

     global.myArrayOfAddresses = myGenAddress

     global.myPendingAddress = global.myArrayOfAddresses[global.myArrayOfAddresses.length-1]
     global.myReceiveAddress = global.myPendingAddress
    // console.log('global.myPendingAddress')
   //  console.log(global.myPendingAddress)

     // now show all previous confirmed messages
     for (myLoop=global.myRecieveIndex; myLoop < global.myArrayOfAddresses.length; myLoop++){   // loop from old address index to index before unused address
         mySendConfirmed(global.myArrayOfAddresses[myLoop])
     }

  })
  .catch(err => {
    console.log(err)
  })


}






function myGenNewAddressOnly(myPassedSeed){

	var options = {
        checksum: true,
		security: 2
	}

iota
  .getNewAddress(myPassedSeed, options)
  .then(myGenAddress => {
      global.myReceiveAddress = myGenAddress   // need a refresh from browser side to see this?
      console.log('Generating new receive address')
      console.log('global.myReceiveAddress')
      console.log(global.myReceiveAddress)
  })
  .catch(err => {
    console.log(err)
  })


}







function myX(myRAddress){   // To see what is happening when you send an address

  iota.findTransactionObjects({ addresses: [myRAddress] })
  .then(response => {
      iota.getLatestInclusion(response.map(tx => tx.hash))
        .then(states => {
            console.log('states.length')
            console.log(states.length)
            for (let myStateLoop = 0; myStateLoop < states.length; myStateLoop++ ){
               console.log('states['+myStateLoop+']')
               console.log(states[myStateLoop])
               console.log('response['+myStateLoop+']')
               console.log(response[myStateLoop])
           }
       })
  })
}



function mySendConfirmed(myRAddress){

  iota.findTransactionObjects({ addresses: [myRAddress] })
  .then(response => {

      iota.getLatestInclusion(response.map(tx => tx.hash))
        .then(states => {

            for (let myStateLoop = 0; myStateLoop < states.length; myStateLoop++ ){
              // console.log('states['+myStateLoop+']')
            //   console.log(states[myStateLoop])
              // console.log('response['+myStateLoop+']')
            //   console.log(response[myStateLoop])
             if (states[myStateLoop] == true){
                  // console.log('This is all we are interested in')
                  // console.log(response[myStateLoop])



///////////////////////////////////////     Do only after startup        ////////////////////////////////////////////////////////////////

            if (global.myNotStartup){
               global.myLatestAddress = response[myStateLoop].address
               //  console.log('global.myLatestAddress')
               //  console.log(global.myLatestAddress)

               myGenNewAddressOnly(mySeed)   // need to generate a new seed for the web page
            }

///////////////////////////////////////      end only after startup       ////////////////////////////////////////////////////////////////




   let myBig = response[myStateLoop].signatureMessageFragment

    if (myBig.length % 2 == 0){
        } else {
       myBigEven = myBig.substring(0, myBig.length - 1);
       myBig = myBigEven
    }

      // needs an even number input!
     myMessage = Converter.trytesToAscii(myBig)


     // Get rid of bad words
     myMessage = myMessage.replace(/Bad-Word/gi, '****');


      // myMessage =     myMessage.substring(0, 5) + '...'   // only show first 5 digits of message


       if (response[myStateLoop].value == 0){
           myMessage = ' '

           }
          if (response[myStateLoop].value >= 0){



      let myTempResponse = ''

       myTempResponse += '<tr><td>'+myMessage+'</td>'

      if (response[myStateLoop].value >= 55000000){   // donot show really big donations
        console.log(response)
        myTempResponse +=  '<td> Cool, as of August 2019 that is greater than $20. Thanks ' + myMessage+'</td>'
     } else {

        myTempResponse += '<td>'+response[myStateLoop].value+'</td>'
     }

       if (response[myStateLoop].value == 0  ){                                                 myTempResponse += '<td>Sorry no comment for you!</td>'  }
       if (response[myStateLoop].value >= 1  && response[myStateLoop].value < 1000  ){          myTempResponse += '<td> between 1 and 1000</td>'  }
       if (response[myStateLoop].value >= 1000  && response[myStateLoop].value < 1000000  ){    myTempResponse += '<td>between 1000 and 1 M</td>'  }
       if (response[myStateLoop].value == 1000000 ){                                            myTempResponse += '<td> equal 1 M</td>'  }
       if (response[myStateLoop].value >  1000000 ){                                            myTempResponse += '<td>Over 1 M</td>'  }

       myTempResponse += '</tr>'
       global.myResponse2 = myTempResponse + global.myResponse2   // to reverse the order in the table


     //  if (global.myRepeatRun == true) {
      //       res.send(global.myCombined);
     //  }

          }  // end bigger than 0 value


             }  // end big loop of confirmed responses!!!!



           }
       })
  })
}




////////////////////////////// Main program starts here ///////////////////////////////

myLoadAddressesFromSeed(mySeed)


app.get('/', function(req, res) {




   global.myCombined = `                // use backtick to write web page

       <h3 align=center>IOTA Basic Web Confirm Transactions </h3>

<li>Using your Trinity Wallet send IOTA to the below receive address

<li>On confirmation of IOTA being sent using your Trinity Wallet, click the Submit button below

<li> If the chart does not update, click the "reload" button until your IOTA is confirmed in the chart

<li>May need to click the "reload" button again to get a new recieve address<br><br>



<form action="/" method="get">
    <input type="hidden" name="myDo" value="third">
    <input type=text name="myReceiveAddressToCheck" value="`+global.myReceiveAddress+`" size = "130" ><br>
    <input type="submit" value="Submit"><input type="reset" value="Reset">
</form>


       <br><br>


<input type=button value="Reload" onclick="{
    location.reload();
}"><br><br>

       <div id="myDivCountdown01">...</div>

       `+global.myResponse0+`
       `+global.myResponse1+` <br>
       <table border=1>
       <tr><th>Message</th><th>Tokens</th><th>Response</th></tr>
       `+global.myResponse2+`
     </table>

   `    // end long string


    res.send(global.myCombined);
  //  global.myRepeatRun = true    // so theabove statement can be refreshed elsewehere

    console.log(req.query)


   if (req.query.myDo == 'third') {    //myReceiveAddressToCheck
       global.myNotStartup = true      // so some special things can happen, check this incoming and generate new seed
       let myIncoming = req.query.myReceiveAddressToCheck
       if (myIncoming.length == 90){
          // console.log(myIncoming)
           myIncoming = myIncoming.substring(0, 81)
          // console.log(myIncoming)
       }
       //.substring(0, myBig.length - 1);
       if (global.myLatestAddress != myIncoming){
        mySendConfirmed(myIncoming)
       } else {
        //  console.log('Already checked that confirmed address')
       }
     }



});   // end app.get




// Listen
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on localhost:'+ port);
