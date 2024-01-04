using UnityEngine;
using System.Collections;

namespace DSJGames {

    public class PlayerManager : MonoBehaviour {

        public float playerHealth = 100;
        public float playerMaxHealth;
        public int playerLevel = 1;
        public int playerExperience = 0;
        public int nextLevelExperience = 0;
        public bool isDead = false;

        public int playerDeaths = 0;

        void Start()
        {
            playerMaxHealth = playerHealth;
            calculateNextLevelXP();
        }

        public void TakeDamage(float damage) {
            playerHealth -= damage;
            if(playerHealth <= 0) {
                Die();
            }
        }

        public void addExperience(int amount) {
            playerExperience += amount;
            checkXP();
        }

        private void checkXP() {
            if(playerExperience >= nextLevelExperience) {
                playerLevel++;
                int tempXP = playerExperience - nextLevelExperience;
                calculateNextLevelXP();
                playerExperience = tempXP;
            }
        }

        private void calculateNextLevelXP() {
            int temp = playerLevel * 300;
            nextLevelExperience = temp;
        }

        private void Die() {
            if (isDead) return;
            isDead = true;
            playerDeaths++;
            BroadcastMessage("PlayGame");
        }

    }

}