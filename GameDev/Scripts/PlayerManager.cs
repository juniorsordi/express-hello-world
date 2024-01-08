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

        public float healthRegenRate = 0.1f;

        public int playerDeaths = 0;

        void Start()
        {
            playerMaxHealth = playerHealth;
            calculateNextLevelXP();
            CheckPlayerStatsByLevel();
        }

        void Update()
        {
            if(healthRegenRate > 0) {
                healthRegeneration();
            }
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
            CheckPlayerStatsByLevel();
        }

        private void healthRegeneration() {
            if(playerHealth >= playerMaxHealth) {
                playerHealth = playerMaxHealth;
            } else {
                float tempNewHealth = playerHealth + (1 * healthRegenRate);
                playerHealth = Mathf.Clamp(tempNewHealth, 0, playerMaxHealth);
            }
        }

        private void CheckPlayerStatsByLevel() {
            float tempHealth = playerMaxHealth + (playerLevel * 50);
            playerMaxHealth = tempHealth;
        }

        private void Die() {
            if (isDead) return;
            isDead = true;
            playerDeaths++;
            BroadcastMessage("PlayGame");
        }

    }

}