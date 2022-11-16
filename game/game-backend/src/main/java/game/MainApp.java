package game;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import game.model.Score;
import game.service.ScoreService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@SpringBootApplication
public class MainApp {
	public static void main(final String[] args) {
		SpringApplication.run(MainApp.class, args);
	}

	/*
	@Bean
	CommandLineRunner runner(ScoreService scoreService){
		return args -> {
			// read JSON and load json

		};
	}
	*/
}
