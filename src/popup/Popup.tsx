import browser from 'webextension-polyfill';
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Container, Typography, AppBar, Toolbar, TextField, FormControlLabel, Checkbox } from "@mui/material"
import { DEFAULT_INSTANCE_URL } from "../common/constants";

const Popup = () => {
  const [misskeyToken, setMisskeyToken] = useState<string | null>(null)
  const [misskeyServer, setMisskeyServer] = useState<string | null>(DEFAULT_INSTANCE_URL);
  const [blueSkyToken, setBlueSkyToken] = useState<string | null>(null)
  const [blueSkyServer, setBlueSkyServer] = useState<string | null>(null);
  const [cw, setCw] = useState<boolean | null>(null)
  const [sensitive, setSensitive] = useState<boolean | null>(null)
  const [showAccess, setShowAccess] = useState<boolean | null>(null)
  const [showLocalOnly, setShowLocalOnly] = useState<boolean | null>(null)
  const [autoTweet, setAutoTweet] = useState<boolean | null>(null)

  useEffect(() => {
    browser.storage.sync.get(['misskey_token', 'misskey_server', 'bluesky_token', 'bluesky_server', 'misskey_cw', 'misskey_sensitive', 'misskey_access', 'misskey_show_local_only', 'misskey_auto_tweet']).then((result) => {
      const misskeyToken = result?.misskey_token; if (misskeyToken) { setMisskeyToken(misskeyToken) }
      const misskeyServer = result?.misskey_server; if (misskeyServer) { setMisskeyServer(misskeyServer) }
      const blueSkyToken = result?.bluesky_token; if (blueSkyToken) { setBlueSkyToken(blueSkyToken) }
      const blueSkyServer = result?.bluesky_server; if (blueSkyServer) { setBlueSkyServer(blueSkyServer) }
      setCw(result?.misskey_cw)
      setSensitive(result?.misskey_sensitive)
      setShowAccess(result?.misskey_access)
      setShowLocalOnly(result?.misskey_show_local_only)
      setAutoTweet(result?.misskey_auto_tweet)
    })
  }, [])
  
  const updateMisskeyToken = (token: string) => {
    setMisskeyToken(token)
    browser.storage.sync.set({ misskey_token: token });
  }

  const updateMisskeyServer = (server: string) => {
    setMisskeyServer(server)
    if (!server.startsWith('https://')) { server = 'https://' + server }
    if (server.endsWith('/')) { server = server.slice(0, -1) }
    browser.storage.sync.set({ misskey_server: server });
  }

  const updateBlueSkyToken = (token: string) => {
    setBlueSkyToken(token)
    browser.storage.sync.set({ bluesky_token: token });
  }

  const updateBlueSkyServer = (server: string) => {
    setBlueSkyServer(server)
    if (!server.startsWith('https://')) { server = 'https://' + server }
    if (server.endsWith('/')) { server = server.slice(0, -1) }
    browser.storage.sync.set({ bluesky_server: server });
  }

  const updateCw = (cw: boolean) => {
    setCw(cw)
    browser.storage.sync.set({ misskey_cw: cw })
  }

  const updateSensitive = (sensitive: boolean) => {
    setSensitive(sensitive)
    browser.storage.sync.set({ misskey_sensitive: sensitive })
  }

  const updateAccess = (access: boolean) => {
    setShowAccess(access)
    browser.storage.sync.set({ misskey_access: access })
  }

  const updateShowLocalOnly = (showLocalOnly: boolean) => {
    setShowLocalOnly(showLocalOnly)
    browser.storage.sync.set({ misskey_show_local_only: showLocalOnly })
  }

  const updateAutoTweet = (autoTweet: boolean) => {
    setAutoTweet(autoTweet)
    browser.storage.sync.set({ misskey_auto_tweet: autoTweet })
  }

  const openDonationPage = () => {
    window.open(
      "https://pielotopica.booth.pm/items/4955538",
      "_blank",
      "noreferrer"
    );
  };

  return (
    <>
      <AppBar position="static" sx={{ minWidth: 400 }}>
        <Toolbar variant="dense">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Misstter</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 2, mb: 2 }}>
        <Typography variant="body2" sx={{ mt: 2, mb: 2, fontSize: 10 }}>
          サーバーのURLを入力してください。デフォルトではmisskey.ioが設定されています。
        </Typography>

        <TextField  
          label="Misskey Server URL"
          placeholder={DEFAULT_INSTANCE_URL}
          value={misskeyServer}
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          size="small"
          sx={{ mb: 2 }}
          onChange={(e) => {
            updateMisskeyServer(e.target.value)
          }}
        />

        <Typography variant="body2" sx={{ mt: 2, mb: 2, fontSize: 10 }}>
          Misskey Tokenはお使いのMisskeyサーバーの 「設定 &#62; API」の画面から取得できます。
          投稿権限とファイルアップロード権限が必要です。(全てを許可すると自動で設定されます)
        </Typography>

        <TextField  
          label="Misskey Token"
          variant="outlined"
          placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          fullWidth
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
          value={misskeyToken}
          onChange={(e) => {
            updateMisskeyToken(e.target.value)
          }}
        />

        <Typography variant="body2" sx={{ mt: 2, mb: 2, fontSize: 10 }}>
          BlueSky Server URLを入力してください。
        </Typography>

        <TextField  
          label="BlueSky Server URL"
          placeholder="https://bsky.social"
          value={blueSkyServer}
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          size="small"
          sx={{ mb: 2 }}
          onChange={(e) => {
            updateBlueSkyServer(e.target.value)
          }}
        />

        <Typography variant="body2" sx={{ mt: 2, mb: 2, fontSize: 10 }}>
          BlueSky Tokenはお使いのBlueSkyサーバーの 「設定 &#62; API」の画面から取得できます。
        </Typography>

        <TextField  
          label="BlueSky Token"
          variant="outlined"
          placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          fullWidth
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
          value={blueSkyToken}
          onChange={(e) => {
            updateBlueSkyToken(e.target.value)
          }}
        />

        <FormControlLabel 
          control={<Checkbox 
            checked={cw ?? false}
            onChange={(e) => {
              updateCw(e.target.checked)
            }}
          />}
          label={<Typography style={{ fontSize: 15 }}>Misskeyへの投稿にCWを設定する。</Typography>}          
        />

        <FormControlLabel
          control={<Checkbox
            checked={sensitive ?? false}
            onChange={(e) => {
              updateSensitive(e.target.checked)
            }}
          />}
          label={<Typography style={{ fontSize: 15 }}>投稿する全ての画像にNSFWを設定する。</Typography>}
        />

        <FormControlLabel
          control={<Checkbox
            checked={showAccess ?? true}
            onChange={(e) => {
              updateAccess(e.target.checked)
            }}
          />}
          label={<Typography style={{ fontSize: 15 }}>投稿の公開範囲設定ボタンを表示する。</Typography>}
        />

        <FormControlLabel
          control={<Checkbox
            checked={showLocalOnly ?? true}
            onChange={(e) => {
              updateShowLocalOnly(e.target.checked)
            }}
          />}
          label={<Typography style={{ fontSize: 15 }}>投稿の連合なし設定ボタンを表示する。</Typography>}
        />

        <FormControlLabel
          control={<Checkbox
            checked={autoTweet ?? false}
            onChange={(e) => {
              updateAutoTweet(e.target.checked)
            }}
          />}
          label={<Typography style={{ fontSize: 15 }}>Misskeyへの投稿後自動的にツイートする。</Typography>}
        />

        <Typography
          sx={{
            display: "block",
            color: "#1976d2",
            mt: 2,
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={openDonationPage}
        >
          開発の支援をお願いします！ / Donation
        </Typography>
      </Container>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
