package com.hris.HRIS_job_portal.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Component
public class EncryptionUtility {

    private static String ALGORITHM;
    private static byte[] KEY;

    @Autowired
    public EncryptionUtility(ConfigUtility configUtil) {
        ALGORITHM = configUtil.getProperty("ENCRYPT_ALGORITHM");
        KEY = configUtil.getProperty("ENCRYPT_PASSWORD").getBytes();
    }

    public static String encrypt(String data) throws Exception {
        if (data == null || data.isEmpty()) {
            throw new IllegalArgumentException("Value to encrypt cannot be null or empty");
        }
        SecretKey secretKey = new SecretKeySpec(KEY, ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        byte[] encrypted = cipher.doFinal(data.getBytes());
        return Base64.getEncoder().encodeToString(encrypted);
    }

    public static String decrypt(String encryptedData) throws Exception {
        if (encryptedData == null || encryptedData.isEmpty()) {
            throw new IllegalArgumentException("Value to decrypt cannot be null or empty");
        }
        SecretKey secretKey = new SecretKeySpec(KEY, ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] original = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
        return new String(original);
    }
}
