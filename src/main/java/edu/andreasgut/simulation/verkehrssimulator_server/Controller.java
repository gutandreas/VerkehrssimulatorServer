package edu.andreasgut.simulation.verkehrssimulator_server;

import org.json.JSONArray;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.json.JSONObject;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@RestController
public class Controller {


    int limit = 20;
    String[][] dataArray = new String[limit][3];
    int counter = 0;


    @GetMapping(value="/index")
    public ModelAndView loadIndex() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/index.html");
        System.out.println("Webseite abgefragt");
        return modelAndView;
    }

    @GetMapping(value="/ranking")
    public ResponseEntity<String> loadData() {
        JSONObject[] jsonObjects = new JSONObject[limit];

        JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < limit; i++){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("name", dataArray[i][0]);
            jsonObject.put("cars", dataArray[i][1]);
            jsonObject.put("time", dataArray[i][2]);
            jsonArray.put(jsonObject);
        }
        JSONObject outerJsonObject = new JSONObject();
        outerJsonObject.put("data", jsonArray);
        //System.out.println(outerJsonObject);

        return new ResponseEntity<>(outerJsonObject.toString(), new HttpHeaders(), HttpStatus.OK);

    }

    @PostMapping(value="/ranking")
    public String saveData(@RequestBody String body){

        if (counter < limit) {

            JSONObject jsonObject = new JSONObject(body);
            String name = jsonObject.getString("name");
            String cars = jsonObject.getString("cars");
            String time = jsonObject.getString("time");

            System.out.println(cars + " Autos von " + name + " zum Zeitpunkt " + time);

            dataArray[counter][0] = name;
            dataArray[counter][1] = cars;
            dataArray[counter][2] = time;

            counter++;

        }

        return "Daten an Server gesendet";


    }
}
