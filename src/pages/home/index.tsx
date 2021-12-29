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
}

const Home = (props: HomeProps) => {
  const [balance, setBalance] = useState<number>();
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

  const [remainingCount, setRemainingCount] = useState(0)
  const [availableCount, setAvailableCount] = useState(0)
  
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

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
        </>
      }

      {wallet.connected &&
        <Box marginBottom={2}>
          <Typography variant="body1" style={{ color: '#9ca9b3' }}>Remained {remainingCount} of {availableCount} NFTs</Typography>
        </Box>
      }

      <MintContainer>
        {wallet.connected && 
        <MintButton
          color="primary"
          disabled={isSoldOut || isMinting || !isActive}
          variant="contained"
        >
          {isSoldOut ? (
            "SOLD OUT"
            ) : isActive ? (
              isMinting ? (
                <CircularProgress />
                ) : (
                  "MINT"
                  )
                  ) : (
                    <Countdown
                    //date={startDate}
                    onMount={({ completed }) => completed && setIsActive(true)}
                    onComplete={() => setIsActive(true)}
                    renderer={renderCounter}
                    />
                    )}
        </MintButton>
        }
      </MintContainer>

      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </main>
  );
};

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <CounterText>
      {hours} hours, {minutes} minutes, {seconds} seconds
    </CounterText>
  );
};

export default Home;
