using UnityEngine;
using UnityEngine.UI;
using System.Collections;

namespace DSJGames {

    public class GameManager : MonoBehaviour {

        public bool isPaused = false;
        public GameObject playerRef;
        public GameObject cnvPause;

        void Start()
        {
            playerRef = GameObject.FindWithTag("Player");
        }

        public void SetPaused(bool v)
        {
            isPaused = v;
        }

        void Update()
        {
            if(isPaused) {
                Time.timeScale = 0;
                cnvPause.SetActive(true);
                Cursor.visible = true;
            } else {
                Time.timeScale = 1;
                cnvPause.SetActive(false);
                Cursor.visible = false;
            }

            if (!isPaused && Input.GetKeyDown(KeyCode.Escape)) {
                isPaused = true;
            } else if (isPaused && Input.GetKeyDown(KeyCode.Escape)) {
                isPaused = false;
            }
        }

        void TogglePausePlayerItems() {
            if(isPaused) {
                playerRef.GetComponent<FirstPersonController>().enabled = false;
            } else {
                playerRef.GetComponent<FirstPersonController>().enabled = true;
            }
        }

        public void GameReload() {
            SceneManager.LoadScene(0);
            Time.timeScale = 1;
        }

        public void QuitGame() {
            Application.Quit();
        }

        public void PlayGame() {
            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
        }

        public void saveGame() {}

        public void loadGame() {}
    }

}