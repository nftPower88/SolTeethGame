import { useEffect, useState } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { Box, Button, CircularProgress, Snackbar, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import * as anchor from "@project-serum/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import { withStyles } from "@material-ui/styles";
import IntroCarousel from "../components/IntroCarousel";
import './index.css';
import GameMode from "../components/GameMode";

const ConnectButton = styled(WalletDialogButton)``;

const CounterText = styled.span``; // add your styles here

const MintContainer = styled.div``; // add your styles here

// const MintButton = styled(Button)`background: #6163ff; color: white`; // add your styles here

const MintButton = withStyles({
  // root: {
  //   background: '#6163ff',
  //   color: 'white'
  // }
})(Button)

export interface HomeProps {
  // candyMachineId: anchor.web3.PublicKey;
  // config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  // startDate: number;
  // treasury: anchor.web3.PublicKey;
  // txTimeout: number;  
  gameMode: number;
  setGameMode: any;
}

const Home = (props: HomeProps) => {
  const [balance, setBalance] = useState<number>();

  const [remainingCount, setRemainingCount] = useState(0)
  const [availableCount, setAvailableCount] = useState(0)

  //const [startDate, setStartDate] = useState(new Date(props.startDate));

  const wallet = useWallet(); 

  useEffect(() => {
    (async () => {
      if (wallet?.publicKey) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, props.connection]);

  useEffect(() => {
    (async () => {
      if (
        !wallet ||
        !wallet.publicKey ||
        !wallet.signAllTransactions ||
        !wallet.signTransaction
      ) {
        return;
      }
    })();
  }, [wallet, props.connection]);

  const frowBetween = {
    display: 'flex',
    flexDirection: 'row' as any,
    justifyContent: 'space-between',
  }

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column' as any,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }

  const shortenAddress = (address:string) => {
    return address.substr(0,4) + "..." + address.substr(address.length - 4)
  }

  return (
    <main style={containerStyles}>
      {
        !wallet.connected ? <>
          <div className="row">
            <img src="images/tooth.png"></img>
            <img src="images/title.png"></img>
            <img src="images/tooth.png"></img>
          </div>
          <ConnectButton>Connect Wallet</ConnectButton>
          <IntroCarousel />
        </> : <>
          <div className="row banner">
            <div className="little-title">
                <img src="images/tooth.png"></img>
                <img src="images/title.png"></img>
                <img src="images/tooth.png"></img>
            </div>
            <div className="address-info">
              <Typography variant="body1" style={{ color: '#9ca9b3' }}>Address: {shortenAddress(wallet.publicKey?.toBase58() || "")}</Typography>
              <Typography variant="body1" style={{ color: '#9ca9b3' }}>Balance: {(balance || 0).toLocaleString()} SOL</Typography>
            </div>
          </div>
          {
            (props.gameMode === 0) ? <>
              <GameMode setGameMode={props.setGameMode}/>
            </> : <>
            
            </>
          } 
        </>
      }

      {/* {wallet.connected &&
        <Box marginBottom={2}>
          <Typography variant="body1" style={{ color: '#9ca9b3' }}>Remained {remainingCount} of {availableCount} NFTs</Typography>
        </Box>
      } */}
      
    </main>
  );
};

export default Home;
